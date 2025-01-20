import React from "react";
import { Button } from "@bun-monorepo/components/ui/button";

export const SubmitButton: React.FC<{ children: React.ReactNode }> = ({
  children,
}) => <Button type="submit">{children}</Button>;
