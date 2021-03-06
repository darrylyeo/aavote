// for the most part, this is a very low-level/dumb class that is meant to track state related
// to a specific entity in the cached graph.
export class Record {
    constructor(cache, id) {
        this.fields = {};
        this.keyVersions = {};
        this.subscribers = {};
        this.recordLinks = {};
        this.listLinks = {};
        this.referenceCounts = {};
        this.lists = [];
        this.cache = cache;
        this.id = id;
    }
    allSubscribers() {
        return Object.values(this.subscribers).flatMap((subscribers) => subscribers);
    }
    getField(fieldName) {
        return this.fields[fieldName];
    }
    writeField(fieldName, value) {
        this.fields[fieldName] = value;
    }
    writeRecordLink(fieldName, value) {
        this.recordLinks[fieldName] = value;
    }
    writeListLink(fieldName, value) {
        this.listLinks[fieldName] = value;
    }
    linkedRecord(fieldName) {
        const linkedRecord = this.recordLinks[fieldName];
        if (linkedRecord === null) {
            return null;
        }
        return this.cache.internal.getRecord(linkedRecord);
    }
    linkedRecordID(fieldName) {
        return this.recordLinks[fieldName];
    }
    linkedListIDs(fieldName) {
        return this.listLinks[fieldName] || [];
    }
    linkedList(fieldName) {
        return (this.listLinks[fieldName] || []).map(this.cache.internal.getRecord);
    }
    appendLinkedList(fieldName, id) {
        // this could be the first time we've seen the list
        if (!this.listLinks[fieldName]) {
            this.listLinks[fieldName] = [];
        }
        this.listLinks[fieldName].push(id);
    }
    prependLinkedList(fieldName, id) {
        // this could be the first time we've seen the list
        if (!this.listLinks[fieldName]) {
            this.listLinks[fieldName] = [];
        }
        this.listLinks[fieldName].unshift(id);
    }
    removeFromLinkedList(fieldName, id) {
        this.listLinks[fieldName] = (this.listLinks[fieldName] || []).filter((link) => link !== id);
    }
    addSubscriber(rawKey, key, ...specs) {
        // if this is the first time we've seen the raw key
        if (!this.keyVersions[rawKey]) {
            this.keyVersions[rawKey] = new Set();
        }
        // add this version of the key if we need to
        this.keyVersions[rawKey].add(key);
        // the existing list
        const existingSubscribers = (this.subscribers[key] || []).map(({ set }) => set);
        // the list of new subscribers
        const newSubscribers = specs.filter(({ set }) => !existingSubscribers.includes(set));
        this.subscribers[key] = this.getSubscribers(key).concat(...newSubscribers);
        // if this is the first time we've seen this key
        if (!this.referenceCounts[key]) {
            this.referenceCounts[key] = new Map();
        }
        const counts = this.referenceCounts[key];
        // increment the reference count for every subscriber
        for (const spec of specs) {
            // we're going to increment the current value by one
            counts.set(spec.set, (counts.get(spec.set) || 0) + 1);
        }
    }
    getSubscribers(fieldName) {
        return this.subscribers[fieldName] || [];
    }
    forgetSubscribers(...targets) {
        this.forgetSubscribers_walk(targets.map(({ set }) => set));
    }
    removeAllSubscribers() {
        this.forgetSubscribers(...this.allSubscribers());
    }
    addListReference(ref) {
        this.lists.push(ref);
    }
    removeListReference(ref) {
        this.lists = this.lists.filter((conn) => !(conn.name === ref.name && conn.parentID === ref.parentID));
    }
    removeAllSubscriptionVersions(keyRaw, spec) {
        // visit every version of the key we've seen and remove the spec from the list of subscribers
        const versions = this.keyVersions[keyRaw];
        // if there are no known versions, we're done
        if (!versions) {
            return;
        }
        this.removeSubscribers([...this.keyVersions[keyRaw]], [spec.set]);
    }
    forgetSubscribers_walk(targets, visited = []) {
        var _a;
        // clean up any subscribers that reference the set
        this.removeSubscribers(Object.keys(this.subscribers), targets);
        visited.push(this.id);
        // walk down to every record we know about
        const linkedIDs = Object.keys(this.recordLinks);
        for (const key of Object.keys(this.listLinks)) {
            for (const child of this.listLinks[key]) {
                if (child !== null) {
                    linkedIDs.push(child);
                }
            }
        }
        for (const linkedRecordID of linkedIDs) {
            if (visited.includes(linkedRecordID)) {
                continue;
            }
            (_a = this.cache.internal.getRecord(linkedRecordID)) === null || _a === void 0 ? void 0 : _a.forgetSubscribers_walk(targets, visited);
        }
    }
    removeSubscribers(fields, sets) {
        var _a;
        // clean up any subscribers that reference the set
        for (const fieldName of fields) {
            // build up a list of the sets we actually need to remove after
            // checking reference counts
            let targets = [];
            for (const set of sets) {
                // if we dont know this field/set combo, there's nothing to do (probably a bug somewhere)
                if (!((_a = this.referenceCounts[fieldName]) === null || _a === void 0 ? void 0 : _a.has(set))) {
                    continue;
                }
                const counts = this.referenceCounts[fieldName];
                const newVal = (counts.get(set) || 0) - 1;
                // decrement the reference of every field
                counts.set(set, newVal);
                // if that was the last reference we knew of
                if (newVal <= 0) {
                    targets.push(set);
                    // remove the count too
                    counts.delete(set);
                }
            }
            // we do need to remove the set from the list
            this.subscribers[fieldName] = this.getSubscribers(fieldName).filter(({ set }) => !targets.includes(set));
        }
    }
}
