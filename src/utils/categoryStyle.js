export const CATEGORY_CONFIG = {
  Work: { label: '업무', bg: 'bg-blue-100', text: 'text-blue-600' },
  Personal: { label: '개인', bg: 'bg-green-100', text: 'text-green-600' },
  Study: { label: '공부', bg: 'bg-purple-100', text: 'text-purple-600' },
  Etc: { label: '기타', bg: 'bg-orange-100', text: 'text-orange-600' },
};

export function getCategoryStyle(category) {
  return CATEGORY_CONFIG[category] || CATEGORY_CONFIG.Etc;
}
