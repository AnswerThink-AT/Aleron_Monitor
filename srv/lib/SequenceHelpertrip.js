module.exports = class SequenceHelper {
  constructor(options) {
    this.db = options.db;
    this.sequence = options.sequence;
    this.table = options.table;
    this.field = options.field || 'ID';
  }

  async getCurrentNumber() {
    let currentNumber = 0;
    switch (this.db.kind) {
      case 'hana':
        try {
          currentNumber = await this.db.run(`SELECT "${this.sequence}".CURRVAL FROM DUMMY`);
        } catch (err) {
          throw new Error(err);
        }
        break;
      case 'sql':
      case 'sqlite':
        // FIXME: Correct this sql query, currently it gets next number. Should provide current number.
        try {
          currentNumber = await this.db.run(`SELECT MAX("${this.field}") FROM "${this.table}"`);
        } catch (err) {
          throw new Error(err);
        }
        break;
      default:
        throw new Error(`Unsupported DB kind --> ${this.db.kind}`);
    }
    return currentNumber;
  }

  async getNextNumber() {
    let nextNumber = 0;
    switch (this.db.kind) {
      case 'hana':
        try {
          nextNumber = (await this.db.run(`SELECT "${this.sequence}".NEXTVAL FROM DUMMY`))[0][
            'COM_ALERON_MONITOR_TripNumberSeq.NEXTVAL'
          ];
        } catch (err) {
          throw new Error(err);
        }
        break;
      case 'sql':
      case 'sqlite':
        try {
          nextNumber = await this.db.run(`SELECT MAX("${this.field}") FROM "${this.table}"`);
        } catch (err) {
          throw new Error(err);
        }
        break;
      default:
        throw new Error(`Unsupported DB kind --> ${this.db.kind}`);
    }
    return nextNumber;
  }
};
