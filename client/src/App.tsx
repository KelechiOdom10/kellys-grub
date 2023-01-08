import { Button } from "~/components/ui/button";
import { Input } from "~/components/ui/input";

function App() {
  return (
    <main className="p-4">
      <Button>Let's see</Button>
      <Input
        label="Email"
        helperText="Mad man"
        required
        placeholder="Enter valid Email"
        error="ukj"
      />
    </main>
  );
}

export default App;
