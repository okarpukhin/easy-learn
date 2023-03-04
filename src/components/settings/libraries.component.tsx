import React from 'react';
import DropdownTreeSelect, { TreeNode } from 'react-dropdown-tree-select'
import 'react-dropdown-tree-select/dist/styles.css'

import { Library } from '../../api/Settings';

interface Props {
    libraries: Library[];
    selectedLibraries: Library[];
    onSave: (libraries: Library[]) => void;
}

interface State {
    selected: string[];
}

interface TreeNodeWithChildren extends TreeNode {
    children: TreeNodeWithChildren[];
}

class Libraries extends React.Component<Props, State> {
    private readonly nodes: TreeNodeWithChildren[];
    private selectedLibraries: Library[];

    constructor(props: Props) {
        super(props);

        this.nodes = this.buildNodes();
        this.selectedLibraries = props.selectedLibraries;

        this.onSave = this.onSave.bind(this);
        this.onChange = this.onChange.bind(this);
    }

    onSave() {
        console.log(this.selectedLibraries);
        this.props.onSave(this.selectedLibraries);
    }

    onChange(currentNode: TreeNodeWithChildren, selectedNodes: TreeNodeWithChildren[]) {
        let values = selectedNodes.map(n => n.value);
        console.log("values: ");
        console.log(values);
        console.log("this.props.libraries: ");
        console.log(this.props.libraries);
        this.selectedLibraries = this.props.libraries.filter(l => {
            return values.find(v => v === l.name || l.name.startsWith(v + "/"));
        });
        console.log("this.selectedLibraries:");
        console.log(this.selectedLibraries);

    }

    private buildNodes(): TreeNodeWithChildren[] {
        let root: TreeNodeWithChildren = { label: null, value: null, children: [] };

        this.props.libraries.forEach(library => {
            let parts = library.name.split("/");
            let currentNode = root;

            parts.forEach(part => {
                let value = (currentNode.value ? currentNode.value + "/" : "") + part;
                let child = currentNode.children.find(c => c.value === value)
                if (!child) {
                    child = { value: value, label: part, children: [], expanded: true, checked: false };
                    currentNode.children.push(child);
                }
                currentNode = child;
            });

            currentNode.checked = this.props.selectedLibraries.indexOf(library) >= 0;
        });

        return root.children;
    }

    render() {
        return (
            <div className='settings'>
                <DropdownTreeSelect data={this.nodes} showPartiallySelected={true} keepTreeOnSearch={true} showDropdown={"always"} onChange={this.onChange} />
                <button onClick={this.onSave}>Start</button>
            </div>);
    }
}

export default Libraries;