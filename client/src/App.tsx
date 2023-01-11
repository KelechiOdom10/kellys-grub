import { Button } from "~/components/ui/button";
import { Input } from "~/components/ui/input";
import { Indicator } from "./components/ui/indicator";
import { Breadcrumbs } from "./components/ui/breadcrumbs";
import { Avatar } from "./components/ui/avatar/Avatar";
import { Star } from "./components/icons/Star";
import { AvatarGroup } from "./components/ui/avatar/AvatarGroup";
import { Logo } from "./components/ui/logo/Logo";

function App() {
  return (
    <main className="p-4">
      <Button>Let's see</Button>
      <Input label="Email" helperText="Mad man" required placeholder="Enter valid Email" error="jhjk" />
      <Indicator color="dark" withBorder label="2">
        <Button>Let's see</Button>
      </Indicator>
      <Breadcrumbs
        items={[{ title: "Mantine", href: "#" }, { title: "Mantine hooks", href: "#" }, { title: "use-id" }]}
        transparent
      />
      <div className="flex items-center space-x-2">
        {" "}
        <Avatar
          imageSrc="https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=facearea&facepad=2&w=256&h=256&q=80"
          alt="Man smiling"
        />
        <Avatar alt="lmkdw">KO</Avatar>
        <Avatar alt="lmkdw" />
        <Avatar alt="lmkdw" withBorder />
        <Avatar alt="" color="blue">
          <Star />
        </Avatar>
        <AvatarGroup
          size="mdLg"
          items={[
            {
              image: "",
              title: "smiling",
              alt: "Man smiling",
            },
            {
              image:
                "https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=facearea&facepad=2&w=256&h=256&q=80",
              title: "smiling",
              alt: "Man smiling",
            },
            {
              image:
                "https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=facearea&facepad=2&w=256&h=256&q=80",
              title: "smiling",
              alt: "Man smiling",
            },
            {
              image:
                "https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=facearea&facepad=2&w=256&h=256&q=80",
              title: "smiling",
              alt: "Man smiling",
            },
            {
              image:
                "https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=facearea&facepad=2&w=256&h=256&q=80",
              title: "smiling",
              alt: "Man smiling",
            },
            {
              image: "",
              title: "smiling",
              alt: "Man smiling",
            },
          ]}
        />
      </div>

      <Logo className="w-10" />
    </main>
  );
}

export default App;
