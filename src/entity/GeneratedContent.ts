import { Entity, PrimaryGeneratedColumn, Column, CreateDateColumn } from "typeorm";

@Entity({ name: 'generated_content' })
export class GeneratedContent {
    @PrimaryGeneratedColumn('increment')
    public id: number;

    @Column('varchar', { length: 32, nullable: false })
    public userId: string;

    @Column('int', { nullable: true })
    public parentContentId: number;

    @Column('varchar', { length: 64, nullable: true })
    public contentType: string;

    @Column('text', { nullable: true })
    public content: string;

    @CreateDateColumn()
    public createdAt: Date;
}
