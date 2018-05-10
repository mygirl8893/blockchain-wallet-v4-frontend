import React from 'react'
import PropTypes from 'prop-types'
import modalEnhancer from 'providers/ModalEnhancer'
import { compose } from 'redux'
import { connect } from 'react-redux'
import StepIndicator from 'components/StepIndicator'
import Tray from 'components/Tray'
import Create from './Create'
import Confirm from './Confirm'
import ISignThis from './ISignThis'
import { ModalHeader, ModalBody } from 'blockchain-info-components'
import { FormattedMessage } from 'react-intl'
import { getData } from './selectors'
import { path } from 'ramda'

class SfoxExchangeData extends React.PureComponent {
  constructor () {
    super()
    this.state = { show: false }
    this.stepMap = {
      verify: <FormattedMessage id='modals.coinifyexchangedata.steps.verify' defaultMessage='Verify' />,
      submit: <FormattedMessage id='modals.coinifyexchangedata.steps.submit' defaultMessage='Submit' />
    }
  }

  componentDidMount () {
    /* eslint-disable */
    this.setState({ show: true })
    /* eslint-enable */
  }

  handleClose () {
    this.setState({ show: false })
    setTimeout(this.props.close, 500)
  }

  getStepComponent (step) {
    switch (step) {
      case 'account': return <Create />
      case 'isx': return <ISignThis />
      case 'confirm': return <Confirm />
    }
  }

  render () {
    const { show } = this.state
    const step = this.props.signupStep || this.props.step

    return (
      <Tray in={show} class='tray' onClose={this.handleClose.bind(this)}>
        <ModalHeader tray center onClose={this.handleClose.bind(this)}>
          <StepIndicator step={step} stepMap={this.stepMap} />
        </ModalHeader>
        <ModalBody>
          { this.getStepComponent(step) }
        </ModalBody>
      </Tray>
    )
  }
}

SfoxExchangeData.propTypes = {
  step: PropTypes.oneOf(['account', 'isx', 'confirm', 'order', 'payment']),
  close: PropTypes.function
}

const mapStateToProps = (state) => ({
  data: getData(state),
  signupStep: path(['coinify', 'signupStep'], state)
})

const mapDispatchToProps = (dispatch) => ({
  // coinifyDataActions: bindActionCreators(actions.core.data.coinify, dispatch)
})

const enhance = compose(
  connect(mapStateToProps, mapDispatchToProps),
  modalEnhancer('CoinifyExchangeData')
)

export default enhance(SfoxExchangeData)
