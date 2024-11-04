/**
 * v-auth
 * 按钮权限指令
 */
import { useUserStore } from '@/store/modules/user';

const auth = {
  mounted(el, binding) {
    const { value } = binding;
    const authStore = useUserStore();
    if (value instanceof Array && value.length) {
      const hasPermission = value.every((item) => authStore.hasAuth(item));
      if (!hasPermission) el.remove();
    } else if (!authStore.hasAuth(value)) el.remove();
  },
};

export default auth;
