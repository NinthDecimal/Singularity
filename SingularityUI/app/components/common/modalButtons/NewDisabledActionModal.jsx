import React, { Component, PropTypes } from 'react';
import { connect } from 'react-redux';

import { FetchDisabledActions, NewDisabledAction } from '../../../actions/api/disabledActions';

import FormModal from '../modal/FormModal';

const DISABLED_ACTION_TYPES = ['BOUNCE', 'DEPLOY', 'SCALE', 'REMOVE', 'DECOMMISSION'];

import Utils from '../../../utils';

class DeleteDisabledActionModal extends Component {
  static propTypes = {
    user: PropTypes.string,
    newDisabledAction: PropTypes.func.isRequired
  };

  show() {
    this.refs.newDisabledActionModal.show();
  }

  render() {
    return (
      <FormModal
        ref="newDisabledActionModal"
        name="New Disabled Action"
        action="Create Disabled Action"
        buttonStyle="success"
        onConfirm={(data) => this.props.newDisabledAction(data.type, data.message)}
        formElements={[
          {
            type: FormModal.INPUT_TYPES.SELECT,
            name: 'type',
            label: 'Type',
            isRequired: true,
            options: DISABLED_ACTION_TYPES.map((type) => ({
              label: Utils.humanizeText(type),
              value: type
            }))
          },
          {
            type: FormModal.INPUT_TYPES.STRING,
            name: 'message',
            label: 'Message',
            isRequired: false,
          }
        ]}
      />
    );
  }
}

const mapDispatchToProps = (dispatch, ownProps) => ({
  newDisabledAction: (type, message) => dispatch(NewDisabledAction.trigger(type, message)).then(() => {dispatch(FetchDisabledActions.trigger());}),
});

export default connect(
  null,
  mapDispatchToProps,
  null,
  { withRef: true }
)(DeleteDisabledActionModal);