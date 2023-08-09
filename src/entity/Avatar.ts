import { Entity, PrimaryGeneratedColumn, Column, CreateDateColumn, UpdateDateColumn } from "typeorm";
import { Patterns, StyleToneVoice, ThemesAndTopics } from "/contracts/avatars/GenerateAvatar";

@Entity({ name: 'avatar' })
export class Avatar {
    @PrimaryGeneratedColumn('increment')
    public id: number;

    @Column('varchar', { length: 255, nullable: false })
    public userId: string;

    @Column('varchar', { length: 255, nullable: true })
    public name: string;

    @Column('text', { nullable: true })
    public description: string;

    @Column('array', { nullable: true })
    public fileIds: string[];

    @Column('json', { nullable: true })
    public patterns: Patterns;

    @Column('json', { nullable: true })
    public avatar: StyleToneVoice;

    @Column('json', { nullable: true })
    public themesAndTopics: ThemesAndTopics;

    @Column('boolean', { default: true })
    public isActive: boolean;

    @CreateDateColumn()
    public createdAt: Date;
    
    @UpdateDateColumn()
    public updatedAt: Date;
}
