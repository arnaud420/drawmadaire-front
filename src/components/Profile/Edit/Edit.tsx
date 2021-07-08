import React from 'react';
import './Edit.scss';
import withUserLoading from '../../../hoc/withUserLoading'
import MainContainer from '../../common/MainContainer'
import Register from '../../Auth/Register'
import CardContainer from '../../common/CardContainer'

const Edit = () => (
  <>
    <MainContainer arrowBack>
      <CardContainer>
        <Register isEdit />
      </CardContainer>
    </MainContainer>
  </>
)

export default withUserLoading(Edit);
