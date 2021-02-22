const React = {
  createElement: (tag, props, ...children) => {
    if (typeof tag === "function") {
      return tag(props);
    }
    const element = { tag, props: { ...props, children } };
    console.log(element);
    return element;
  }
};

const states = [];
let stateCursor = 0;

const useState = (initialState) => {
  const CURSOR = stateCursor;
  states[CURSOR] = states[CURSOR] || initialState;
  let setState = (newState) => {
    states[CURSOR] = newState;
    ReRender();
  };

  stateCursor++;

  return [states[CURSOR], setState];
};

const App = () => {
  const [name, setName] = useState("React");
  const [count, setCount] = useState(0);

  return (
    <div className="title">
      <h1>Hello {name}!</h1>
      <input
        type="text"
        placeholder="name"
        value={name}
        onchange={(e) => setName(e.target.value)}
      />
      <h2>The count is: {count}</h2>
      <button onclick={() => setCount(count + 1)}>Inc ++</button> &nbsp;
      <button onclick={() => setCount(count - 1)}>Dec --</button>
      <p>
        Lorem ipsum dolor sit amet consectetur adipisicing elit. Aspernatur
        voluptatum voluptatem, possimus ut necessitatibus totam in labore, eius,
      </p>
    </div>
  );
};

const render = (reactElement, container) => {
  if (["string", "number"].includes(typeof reactElement)) {
    container.appendChild(document.createTextNode(String(reactElement)));
    return;
  }
  const actualDomElem = document.createElement(reactElement.tag);
  if (reactElement.props) {
    Object.keys(reactElement.props)
      .filter((p) => p !== "children")
      .forEach((p) => (actualDomElem[p] = reactElement.props[p]));
  }
  if (reactElement.props.children) {
    reactElement.props.children.forEach((child) =>
      render(child, actualDomElem)
    );
  }
  container.appendChild(actualDomElem);
};

const ReRender = () => {
  stateCursor = 0;
  document.querySelector("#app").firstChild.remove();
  render(<App />, document.querySelector("#app"));
};

render(<App />, document.querySelector("#app"));
