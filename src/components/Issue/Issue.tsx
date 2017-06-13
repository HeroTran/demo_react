import * as React from 'react'


interface IssueProps {
    params: any;
}
 

export default class Issue extends React.Component<IssueProps,any>{
    
    render(){
        const {params} = this.props;
        console.log(params.id);
        return(
            <div>
                Hello Issue id {params.id}
            </div>

        );
    }
}