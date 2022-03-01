
# function signitures

<!-- fun name (return type) (args) -->
fun printName(string) (name string) {
  return log("hello" + " " + name);
}

<!-- fn name (return type) (args) -->
fn printName(string) (name string) {
  return log("hello" + " " + name);
}

<!-- func name (return type) (args) -->
func printName(string) (name string) {
  return log("hello" + " " + name);
}

func getName(name: (String, String)) -> (name[0] first, name[1] last) {
  return ["Parker", "Henderson"];
};

first, last := getName()
