import { Column, Model, Table } from 'sequelize-typescript'

@Table
export class Users extends Model<Users>
{
    @Column({ allowNull: false })
    name: string;
    @Column({ allowNull: false })
    lastname: string;
    @Column({ allowNull: false })
    patronymic: string;
    @Column({ allowNull: false })
    email: string;
    @Column({ allowNull: false })
    password: string;
    @Column({ allowNull: false })
    isActive: boolean;
    @Column({ allowNull: false })
    confirmationCode: string;
    @Column({ allowNull: false })
    isEmailConfirmed: boolean;
}
