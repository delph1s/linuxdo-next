/**
 * 目标项是否在排除项中，在就返回 false
 *
 * @param targetProp 目标项
 * @param excludeProps 排除项
 * @returns boolean
 */
export const filterForwardProps = (targetProp: string, excludeProps: string[]) => excludeProps.indexOf(targetProp) === -1;
