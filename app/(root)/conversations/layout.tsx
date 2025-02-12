import React from "react";

type Props = {
  children: React.ReactNode;
};

const ConversationsLayout = ({ children }: Props) => {
  return <div>{children}</div>;
};

export default ConversationsLayout;
