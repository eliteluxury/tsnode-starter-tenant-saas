import {Entity, PrimaryGeneratedColumn, Column, OneToMany, JoinColumn, ManyToMany, JoinTable} from "typeorm"
import { Unit } from './Unit';
import { TenantScope } from './TenantScope';
import { PropertyImage } from './PropertyImage';
import { PropertyFeatures } from './PropertyFeatures';

@Entity()
export class Property extends TenantScope {

    @PrimaryGeneratedColumn()
    Id: number;

    @Column()
    Street: string;

    @Column()
    ApartmentSuite!: string;

    @Column()
    City!: string;

    @Column()
    State!: string;

    @Column()
    Zipcode!: string;

    @OneToMany(type => Unit, unit => unit.Property)
    @JoinColumn({ name: "UnitId" })
    Units: Unit[];

    @Column()
    Type: number;

    @OneToMany(type => PropertyImage, propertyImage => propertyImage.Property)
    PropertyImages: PropertyImage[];

    @ManyToMany(type => PropertyFeatures, propertyFeatures => propertyFeatures.Property)
    @JoinTable({ name: "property_property_features"})
    PropertyFeatures: PropertyFeatures[];
}
