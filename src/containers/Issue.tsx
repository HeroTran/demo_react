import * as React  from 'react'
import { bindActionCreators } from 'redux'
import { connect } from 'react-redux'
import Issue from '../components/Issue/Issue'


interface Props extends React.Props<IssueContainer> {
  params : any
}
export default class IssueContainer extends React.Component<Props, {}> {
    constructor(props : Props){
        super(props);
    }
    render(){
        const {params} = this.props;
        return(
            <div>
                <Issue params={params}  key={0}/>
            </div>

        );
    }
}





