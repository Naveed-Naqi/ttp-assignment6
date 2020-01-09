import React, { Fragment } from 'react';
import PropTypes from 'prop-types';
import { makeStyles } from '@material-ui/core/styles';
import Card from '@material-ui/core/Card';
import CardContent from '@material-ui/core/CardContent';
import Typography from '@material-ui/core/Typography';

const useStyles = makeStyles({
  card: {
    width: "30%",
    textAlign: "center",
    display: "inline-block",
    margin: "1%",
  },
  title: {
    fontSize: 14,
  },
  pos: {
    marginBottom: 12,
  },
});



export default function SingleContactCard({city, state, lat, long, pop, variant, zipcode}) {
    const classes = useStyles();

    const determineDisplay = (variant) => {
        if(variant === "zipcode") {
            return (
                <Card className={classes.card} variant="outlined">
                    <CardContent>
                        <Typography variant="h5" component="h2" className={classes.pos}>
                            {city + ", " + state}
                        </Typography>
                        <Typography className={classes.pos} >
                            Location: {lat + ", " + long}
                        </Typography>
                        <Typography variant="body2" component="p">
                            Estimated Population: {pop}
                        </Typography>
                    </CardContent>
                </Card>
            );
        } else {
            return (
                <Card className={classes.card} variant="outlined">
                    <CardContent>
                        <Typography variant="h5" component="h2">
                            {zipcode}
                        </Typography>
                    </CardContent>
                </Card>
            );
        }
    }

    return (
        <Fragment>
            {determineDisplay(variant)}
        </Fragment>
    );
}