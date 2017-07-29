import React from 'react';

const list = [
  { id: '0', name: 'learn local state' },
  { id: '1', name: 'learn redux' }
];

class App extends React.Component {
  render() {
    return (
      <div>
        <h1>Before Lifting</h1>
        <SearchableListBefore list={list} />
        <h1>After Lifting, No Changed Functionality but Code</h1>
        <SearchableListAfter list={list} />
      </div>
    );
  }
}

// Before Lifting

function SearchBefore({ query, onChange, children }) {
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

function ListBefore({ list, onArchive }) {
  return (
    <ul>
      {list.map(item =>
        <li key={item.id}>
          <span>
            {item.name}
          </span>
          <span>
            <button
              type="button"
              onClick={() => onArchive(item.id)}
            >
              Archive
            </button>
          </span>
        </li>
      )}
    </ul>
  );
}

class SearchableListBefore extends React.Component {
  constructor(props) {
    super(props);

    this.state = {
      query: '',
      archivedItems: []
    };

    this.onChange = this.onChange.bind(this);
    this.onArchive = this.onArchive.bind(this);
  }

  onChange(event) {
    const { value } = event.target;

    this.setState({
      query: value
    });
  }

  onArchive(id) {
    const { archivedItems } = this.state;

    this.setState({
      archivedItems: [...archivedItems, id]
    });
  }

  render() {
    const { list } = this.props;
    const { query, archivedItems } = this.state;

    const filteredList = list
      .filter(byQuery(query))
      .filter(byArchived(archivedItems));

    return (
      <div>
        <SearchBefore
          query={query}
          onChange={this.onChange}
        >
          Search List:
        </SearchBefore>
        <ListBefore
          list={filteredList}
          onArchive={this.onArchive}
        />
      </div>
    );
  }
}

function byArchived(archivedItems) {
  return function(item) {
    return !archivedItems.includes(item.id);
  }
}

function byQuery(query) {
  return function(item) {
    return !query ||
      item.name.toLowerCase().includes(query.toLowerCase());
  }
}

// After Lifting

class ListAfter extends React.Component {
  constructor(props) {
    super(props);

    this.state = {
      archivedItems: []
    };

    this.onArchive = this.onArchive.bind(this);
  }

  onArchive(id) {
    const { archivedItems } = this.state;

    this.setState({
      archivedItems: [...archivedItems, id]
    });
  }

  render() {
    const { list } = this.props;
    const { archivedItems } = this.state;

    const filteredList = list
      .filter(byArchived(archivedItems));

    return (
      <ul>
        {filteredList.map(item =>
          <li key={item.id}>
            <span>
              {item.name}
            </span>
            <span>
              <button
                type="button"
                onClick={() => this.onArchive(item.id)}
              >
                Archive
              </button>
            </span>
          </li>
        )}
      </ul>
    );
  }
}

class SearchableListAfter extends React.Component {
  constructor(props) {
    super(props);

    this.state = {
      query: '',
      archivedItems: []
    };

    this.onChange = this.onChange.bind(this);
    this.onArchive = this.onArchive.bind(this);
  }

  onChange(event) {
    const { value } = event.target;

    this.setState({
      query: value
    });
  }

  onArchive(id) {
    const { archivedItems } = this.state;

    this.setState({
      archivedItems: [...archivedItems, id]
    });
  }

  render() {
    const { list } = this.props;
    const { query } = this.state;

    const filteredList = list
      .filter(byQuery(query));

    return (
      <div>
        <SearchBefore
          query={query}
          onChange={this.onChange}
        >
          Search List:
        </SearchBefore>
        <ListAfter
          list={filteredList}
        />
      </div>
    );
  }
}

export default App;
