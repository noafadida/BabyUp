export class TipTitem {
    id: String;
    imageUrl: String;
    title: String;
    subTitle: String;
    content: String;


    constructor(id: string, imageUrl: string, title: string, subTitle: string, content: string) {
        this.id = id;
        this.imageUrl = imageUrl;
        this.title = title;
        this.subTitle = subTitle;
        this.content = content
    }
};

export default TipTitem;