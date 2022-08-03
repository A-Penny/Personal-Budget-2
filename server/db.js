
class Envelope {
    constructor (budget) {
        this.id = null;
        this.name = ''
        this._budget = budget;
        this._balance = budget;
        this._spent = 0;
    }

    get budget () {
        return this._budget;
    }

    get balance() {
        return this._balance
    }

    get spent () {
        return this._spent;
    }

    set addSpend(amount) {
        this._spent += amount;
        this.newBalance();
    }

    newBalance() {
        this._balance -= this._spent;
        return this._balance;
    }
};

let idCounter = 1;

// starting envelopes
let housing = new Envelope (0);
housing.name = 'housing';
housing.id = idCounter++;
let food = new Envelope(0);
food.name = 'food';
food.id = idCounter++;
let transportation = new Envelope(0);
transportation.name = 'transportation';
transportation.id = idCounter++;
let entertainment = new Envelope(0);
entertainment.name = 'entertainment';
entertainment.id = idCounter++;

let envelopes = [housing, food, transportation, entertainment];

// function to GET all envelopes
const getAllEnvelopes =() => {
    return envelopes;
}
const envelopeIndexFinder = (id) => {
    let envIndex = envelopes.findIndex(x => x.id === id);
    if (envIndex !== -1) {
        return envIndex;
    };
}
// function to GET an element by ID
const getEnvelopeById = (id) => {
    let envIndex = envelopeIndexFinder(id);
    if (envIndex !== -1) {
        return envelopes[envIndex]
    }
}

// function to update spent amount (or remove spent). Argument is the envelope to be updated
const updateSpend = (env, amt) => {
    env.addSpend = amt;
    return env.balance;
}

// function to create a new envelope
const createNewEnvelope = (name, budg) => {
    let env = new Envelope (budg);
    env.name = name;
    env.id = idCounter++;
    envelopes.push(env)
    return env
}

// function to update the properties of an envelope object
const updateEnvelopeById = (id, env) => {
    let envIndex = envelopeIndexFinder(id);
    if (envIndex !== -1) {
        console.log(env)
        env.id = id;
        envelopes[envIndex] = env
        return envelopes[envIndex];
    }
}

const exportedObjects = {getAllEnvelopes, updateSpend, createNewEnvelope, getEnvelopeById, updateEnvelopeById}

module.exports = exportedObjects;


