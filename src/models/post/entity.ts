import Entity from 'models/interfaces';

export default class Post implements Entity {
  id?: string;

  title!: string;

  slug!: string;

  body!: string;

  tags!: string[];

  created!: Date;

  updated?: Date;

  signature?: string;

  __name = 'post';
}
