import SidebarWrapper from "@/components/shared/sidebar/SidebarWrapper";

type Props = {
  children: React.ReactNode;
};

export default function layout({ children }: Props) {
  return <SidebarWrapper>{children}</SidebarWrapper>;
}
