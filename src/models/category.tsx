export class Category {
  title: String;
  color: String;
  id: String;
  image:String

  constructor(id: string, title: string, color: string, image:string) {
    this.id = id;
    this.title = title;
    this.color = color;
    this.image=image
  }
};
