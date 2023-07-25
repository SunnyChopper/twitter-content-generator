import {
    Entity,
    PrimaryGeneratedColumn,
    Column,
    CreateDateColumn,
} from "typeorm";

@Entity()
export class GeneratedContent {
    @PrimaryGeneratedColumn()
    id: number;

    @Column()
    content_type: string;

    @Column("text")
    content: string;

    @CreateDateColumn()
    generated_at: Date;
}