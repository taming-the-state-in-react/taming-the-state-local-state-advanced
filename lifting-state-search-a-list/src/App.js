import React from 'react';

const list = [
  { id: '0', name: 'learn local state' },
  { id: '1', name: 'learn redux' }
];

class App extends React.Component {
  render() {
    return (
      <div>
        <h1>Not Working:</h1>
        <SearchableListBefore list={list} />
        <h1>Working:</h1>
        <SearchableListAfter list={list} />
      </div>
    );
  }
}

// Before Lifting, Not Working

class SearchBefore extends React.Component {
  constructor(props) {
    super(props);

    this.state = {
      query: ''
    };

    this.onChange = this.onChange.bind(this);
  }

  onChange(event) {
    const { value } = event.target;

    this.setState({
      query: value
    });
  }

  render() {
    return (
      <div>
        {this.props.children} <input
          type="text"
          value={this.state.query}
          onChange={this.onChange}
        />
      </div>
    );
  }
}

function SearchableListBefore({ list }) {
  return (
    <div>
      <SearchBefore>Search List:</SearchBefore>
      <List list={list} />
    </div>
  );
}

// After Lifting

function SearchAfter({ query, onChange, children }) {
  return (
    <div>
      {children} <input
        type="text"
        value={query}
        onChange={onChange}
      />
    </div>
  );
}

class SearchableListAfter extends React.Component {
  constructor(props) {
    super(props);

    this.state = {
      query: ''
    };

    this.onChange = this.onChange.bind(this);
  }

  onChange(event) {
    const { value } = event.target;

    this.setState({
      query: value
    });
  }

  render() {
    const { list } = this.props;
    const { query } = this.state;

    return (
      <div>
        <SearchAfter
          query={query}
          onChange={this.onChange}
        >
          Search List:
        </SearchAfter>
        <List list={(list || []).filter(byQuery(query))} />
      </div>
    );
  }
}

function byQuery(query) {
  return function(item) {
    return !query ||
      item.name.toLowerCase().includes(query.toLowerCase());
  }
}

// Unchanged, used in before and after

function List({ list }) {
  return (
    <ul>
      {list.map(item => <li key={item.id}>{item.name}</li>)}
    </ul>
  );
}

export default App;
