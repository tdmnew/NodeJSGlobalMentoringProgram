import { getMockReq, getMockRes } from '@jest-mock/express';
import {
    getGroup,
    getGroups,
    deleteGroup,
    updateGroup,
    createGroup
} from '../groups.controller';

const group = {
    id: '1',
    name: 'Admin',
    permisions: ['READ', 'WRITE', 'DELETE', 'SHARE', 'UPLOAD FILES']
};

const createdGroup = {
    id: '2',
    name: 'User',
    permisions: ['READ', 'WRITE']
};

const updatedGroup = {
    id: '1',
    name: 'Admin',
    permisions: ['READ', 'WRITE', 'DELETE', 'SHARE']
};

jest.mock('../../../services/group.service.ts', () => {
    return jest.fn().mockImplementation(() => {
        return {
            getGroup: jest.fn().mockReturnValue(group),
            getGroups: jest.fn().mockReturnValue([group]),
            createGroup: jest.fn().mockReturnValue(createdGroup),
            updateGroup: jest.fn().mockReturnValue(updatedGroup),
            deleteGroup: jest.fn().mockReturnValue(group)
        };
    });
});

describe("When the method 'getGroup' is called", () => {
    describe('and the correct params are passed', () => {
        const req = getMockReq({ params: { id: '1' } });
        const { res } = getMockRes({
            locals: group
        });

        beforeEach(async () => {
            await getGroup(req, res);
        });

        it('should 200 and return the correct value', () => {
            expect(res.json).toHaveBeenCalledWith(group);
        });
    });
});

describe("When the method 'getGroups' is called", () => {
    describe('and the correct params are passed', () => {
        const req = getMockReq();

        const { res } = getMockRes({
            locals: [group]
        });

        beforeEach(async () => {
            await getGroups(req, res);
        });

        it('should 200 and return the correct value', () => {
            expect(res.json).toHaveBeenCalledWith([group]);
        });
    });
});

describe("When the method 'createGroup' is called", () => {
    describe('and the correct params are passed', () => {
        const req = getMockReq({
            body: {
                id: '2',
                name: 'User',
                permisions: ['READ', 'WRITE']
            }
        });
        const { res } = getMockRes({
            locals: createdGroup
        });

        beforeEach(async () => {
            await createGroup(req, res);
        });

        it('should 200 and return the correct value', () => {
            expect(res.send).toHaveBeenCalledWith(createdGroup);
        });
    });
});

describe("When the method 'updateGroup' is called", () => {
    describe('and the correct params are passed', () => {
        const req = getMockReq({
            params: { id: '1' },
            body: { permissions: ['READ', 'WRITE', 'DELETE', 'SHARE'] }
        });
        const { res } = getMockRes({
            locals: updatedGroup
        });

        beforeEach(async () => {
            await updateGroup(req, res);
        });

        it('should 200 and return the correct value', () => {
            expect(res.send).toHaveBeenCalledWith(updatedGroup);
        });
    });
});

describe("When the method 'deleteGroup' is called", () => {
    describe('and the correct params are passed', () => {
        const req = getMockReq({ params: { id: '1' } });
        const { res } = getMockRes({
            locals: group
        });

        beforeEach(async () => {
            await deleteGroup(req, res);
        });

        it('should 200 and return the correct value', () => {
            expect(res.send).toHaveBeenCalledWith(group);
        });
    });
});
