import { Entity, PrimaryGeneratedColumn, Column } from 'typeorm';

@Entity('products')
class Product {
  @PrimaryGeneratedColumn('uuid')
  id: string;

  @Column()
  name: string;

  @Column('decimal')
  price: number;

  @Column('int')
  quantity: number;

  @Column()
  created_at: Date;

  @Column()
  updated_at: Date;
}

export default Product;
