export const headerLinks: Array<{
  label: string;
  route: string;
  public: boolean;
}> = [
  {
    label: "Home",
    route: "/",
    public: true,
  },
  {
    label: "AI Hub",
    route: "/ai",
    public: true,
  },
  {
    label: "Vault",
    route: "/vault",
    public: false,
  },
  {
    label: "Create",
    route: "/events/create",
    public: false,
  },
  {
    label: "My Profile",
    route: "/profile",
    public: false,
  },
];

export const eventDefaultValues = {
  title: "",
  description: "",
  location: "",
  imageUrl: "",
  startDateTime: new Date(),
  endDateTime: new Date(),
  categoryId: "",
  price: "",
  isFree: false,
  TrailerUrl: "",
  url: "",
};
