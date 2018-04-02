import React, { Component } from 'react';
import { Segment, Grid, List, Header, Container, Input } from 'semantic-ui-react';

class Footer extends Component {
    render() {
        return (
            <Segment inverted vertical style={{ padding: '5em 0em' }}>
                <Container>
                    <Grid divided inverted stackable>
                    <Grid.Row>
                        <Grid.Column width={3}>
                        <Header inverted as='h4' content='About' />
                        <List link inverted>
                            <List.Item as='p' style={{marginBottom: 0}}>Theodo x CS</List.Item>
                            <List.Item as='p' style={{marginBottom: 0}}>3 rue Joliot Cury</List.Item>
                            <List.Item as='p'>Gif-sur-Yvette</List.Item>
                        </List>
                        </Grid.Column>
                        <Grid.Column width={3}>
                        <Header inverted as='h4' content='Contact' />
                        <List link inverted>
                            <List.Item as='a' href="mailto:jessica.cohen@student.ecp.fr">contact@blackship.co</List.Item>
                        </List>
                        </Grid.Column>
                        <Grid.Column width={6}>
                        <Header as='h4' inverted>Reach out to learn more!</Header>
                        <div id="mc_embed_signup">
                            <form action="" method="post" id="mc-embedded-subscribe-form" name="mc-embedded-subscribe-form" className="validate" target="_blank" noValidate>
                                <div id="mc_embed_signup_scroll">
                                    <div className="mc-field-group">
                                        <Input placeholder="E-mail" type="email" name="EMAIL" id="mce-EMAIL" action="Sign up !"/>
                                    </div>
                                    <div id="mce-responses">
                                        <div id="mce-error-response" style={{display:"none"}}></div>
                                        <div id="mce-success-response" style={{display:"none"}}></div>
                                    </div>
                                    <div style={{position: "absolute", left: "-5000px"}}>
                                        <input type="text" name="b_54ad4d4a5bab022afb8b4d38c_b152d55b98" tabIndex="-1" value=""/>
                                    </div>
                                </div>
                            </form>
                        </div>
                        </Grid.Column>
                    </Grid.Row>
                    </Grid>
                </Container>
            </Segment>
        )
    }
}

export default Footer ;
