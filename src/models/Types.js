export const GenderType = {
  Male: 0,
  Female: 1,
  Unspecified: 2
};
export const RegisterRoleType = {
  Employer: 1,
  Employee: 2
};

export const RoleType = {
  Admin: 0,
  Employer: 1,
  Employee: 2
};

export const DoneApplicationType = {
  Pending: 0,
  Denied: 1,
  Accepted: 2,
  Completed: 3
};

export const DoneApplicationTypePair = [
  { key: "Pending", value: 0 },
  { key: "Denied", value: 1 },
  { key: "Accepted", value: 2 },
  { key: "Completed", value: 3 }
];

export function getKeyByVal(value, TypeObject) {
  var key = Object.keys(TypeObject).filter(key => {
    return TypeObject[key] === value;
  })[0];
  return key;
}
