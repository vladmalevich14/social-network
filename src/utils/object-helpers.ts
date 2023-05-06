
export const updateObjectInArray = (items: Array<any>, itemId: number | string, ObjPropName: string, newObjProps: any) => {
    return items.map(el => el[ObjPropName] === itemId ? {...el, ...newObjProps} : el)
}