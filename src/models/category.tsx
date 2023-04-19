export class Category {
  title: String;
  color: String;
  id: String;

  constructor(id: string, title: string, color: string) {
    this.id = id;
    this.title = title;
    this.color = color;
  }
};
