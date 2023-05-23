export class TipTitem {
    id: String;
    imageUrl: String;
    title: String;
    subTitle: String;
    content: Object[];


    constructor(id: string, imageUrl: string, title: string, subTitle: string, content: Object[]) {
        this.id = id;
        this.imageUrl = imageUrl;
        this.title = title;
        this.subTitle = subTitle;
        this.content = content
    }
};

export default TipTitem;