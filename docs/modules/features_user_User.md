[CRUD User Management Documentation](../README.md) / [Modules](../modules.md) / features/user/User

# Module: features/user/User

## Table of contents

### Functions

- [default](features_user_User.md#default)

## Functions

### default

▸ **default**(`props`, `context?`): `ReactNode`

User Management Component

#### Parameters

| Name | Type |
| :------ | :------ |
| `props` | `Object` |
| `context?` | `any` |

#### Returns

`ReactNode`

**`Component`**

User

**`Description`**

Main component for handling user CRUD operations

**`Features`**

- Fetch users from API
- Add new users with validation
- Edit existing users
- Delete users with confirmation
- Navigate between users in edit mode
- Handle duplicate email/phone validation
- Loading states and error handling
- Toast notifications

**`Example`**

```tsx
<User />
```

#### Defined in

src/features/user/User.tsx:49
