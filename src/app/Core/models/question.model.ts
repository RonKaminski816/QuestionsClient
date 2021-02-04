
export class QuestionModel {
    constructor(
        public id: string = '',
        public name: string = '',
        // public creationDate: Date = null,
        public creationDate: string = null,
        public description: string = ''
    ) { }
}