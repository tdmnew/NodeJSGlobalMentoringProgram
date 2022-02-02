import { Sequelize, DataTypes } from 'sequelize';

const Group = (sequelize: Sequelize) =>
    sequelize.define('groups', {
        id: {
            type: DataTypes.UUID,
            defaultValue: DataTypes.UUIDV4,
            primaryKey: true,
            allowNull: false
        },
        name: {
            type: DataTypes.STRING,
            allowNull: false
        },
        permissions: {
            type: DataTypes.ARRAY(
                DataTypes.ENUM({
                    values: ['READ', 'WRITE', 'DELETE', 'SHARE', 'UPLOAD FILES']
                })
            ),
            allowNull: false
        }
    });

export default Group;
