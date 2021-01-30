import React from 'react';
import { makeStyles } from '@material-ui/core/styles';
import Card from '@material-ui/core/Card';
import CardActionArea from '@material-ui/core/CardActionArea';
import CardActions from '@material-ui/core/CardActions';
import CardContent from '@material-ui/core/CardContent';
import CardMedia from '@material-ui/core/CardMedia';
import Button from '@material-ui/core/Button';
import Typography from '@material-ui/core/Typography';

const useStyles = makeStyles({
  root: {
    maxWidth: 345,
  },
  media: {
    height: 140,
  },
});

export default function LandingCard({image, title, content, handleClick}) {
  const classes = useStyles();

  return (
    <Card className={classes.root}>
      <CardActionArea onClick={() => handleClick()}>
        <CardMedia>
            {image}
        </CardMedia>
        <CardContent>
          <Typography gutterBottom variant="h5" component="h2" style={{color: '#000'}}>
            {title}
          </Typography>
          <Typography variant="body2" color="textSecondary" component="p">
              {content}
          </Typography>
        </CardContent>
      </CardActionArea>
    </Card>
  );
}
