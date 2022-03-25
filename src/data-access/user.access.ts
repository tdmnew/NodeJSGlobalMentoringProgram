import { Op } from 'sequelize';

import User from '../types/user.type';
import { Group } from '../models';

export const findUser = ({
    id,
    login
}: {
    id?: User['id'];
    login?: User['login'];
}) => ({
    include: [
        {
            model: Group,
            as: 'groups'
        }
    ],
    where: { ...(id && { id }), ...(login && { login }), isDeleted: false }
});

export const autoSuggestions = (loginSubstring?: string, limit?: number) => ({
    limit,
    include: [
        {
            model: Group,
            as: 'groups'
        }
    ],
    where: {
        login: {
            [Op.substring]: loginSubstring
        },
        isDeleted: false
    }
});
