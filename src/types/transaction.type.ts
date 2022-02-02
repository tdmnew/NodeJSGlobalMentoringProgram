import UserGroup from './usergroup.type';

type ValidationErrorItem = {
  message: string;
  type: string;
  path: string;
  value: string;
  origin: string;
  validatorKey: string;
  validatorArgs: [];
};

type TransactionSuccess = {
  usergroups: {
    dataValues: {
      groupId: string;
      userId: string;
      createdAt: Date;
      updatedAt: Date;
    };
  };
};

interface TransactionError {
  original: {
    detail: string;
  };
  errors: Array<ValidationErrorItem>;
}

interface TransactionResult {
  success: boolean;
  result?: Array<UserGroup>;
  message?: string;
  errors?: Array<ValidationErrorItem['message']>;
}

export type {
    ValidationErrorItem,
    TransactionSuccess,
    TransactionError,
    TransactionResult
};
