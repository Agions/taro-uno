/**
 * 创建BEM类名工具函数
 * @param namespace 命名空间
 * @returns BEM工具函数
 */
export const createNamespace = (namespace: string) => {
  const bem = (name?: string, modifiers: string[] = []) => {
    const base = namespace;
    if (!name) return base;

    const block = `${base}__${name}`;
    if (modifiers.length === 0) return block;

    return modifiers
      .filter(Boolean)
      .map((mod) => `${block}--${mod}`)
      .join(' ');
  };

  return {
    bem,
    namespace,
  };
};
