import { Entity, PrimaryGeneratedColumn, Column, CreateDateColumn } from "typeorm";

@Entity({ name: 'twitter_file' })
export class TwitterFile {
    @PrimaryGeneratedColumn('increment')
    public id: number;

    @Column('varchar', { length: 255, nullable: false })
    public userId: string;

    @Column('varchar', { length: 255, nullable: true })
    public fileName: string;

    @Column('varchar', { length: 255, nullable: true })
    public fileUrl: string;

    @CreateDateColumn()
    public createdAt: Date;
}
