import { createParamDecorator, ExecutionContext } from '@nestjs/common';

export const GetUserId = createParamDecorator(
  (data: unknown, context: ExecutionContext): number => {
    const user = context.switchToHttp().getRequest().user;
    if (user?.id) {
      return user.id;
    }
    return NaN;
  },
);
