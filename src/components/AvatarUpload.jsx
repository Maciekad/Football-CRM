import React from 'react';
import PropTypes from 'prop-types';
import clsx from 'clsx';
/** @jsx jsx */
import { css, jsx } from '@emotion/core';

import {
  Avatar,
  Box,
  Button,
  Card,
  CardContent,
  Divider,
  Typography,
  makeStyles
} from '@material-ui/core';

const user = {
  avatar: './arsenal.png',
  city: 'Warsaw',
  country: 'Poland',
  jobTitle: 'Senior Developer',
  name: 'Maciej Adrych',
};

const useStyles = makeStyles(() => ({
  root: {
      height: 240,
      width: 320,
      margin: '20px 0px 20px 0px'
  },
  avatar: {
    height: 100,
    width: 100,
  }
}));

const AvatarUpload = ( props,{ className, ...rest }) => {
  const classes = useStyles();
  const { user } = props;

  const fileSelectedHandler = e => {
    let avatar = e.target.files[0]
    console.log(avatar)
  }

  const handleClick = (event) => {

  }

  return (
    <div>
      <Card className={clsx(classes.root, className)} {...rest}>
        <CardContent>
          <Box alignItems="center" display="flex" flexDirection="column">
            <Avatar className={classes.avatar} src={user.picture} />
            <Typography color="textPrimary" gutterBottom variant="h5">
              {user.name}
            </Typography>
            <Typography color="textSecondary" variant="body1">
              {`${user.email}`}
            </Typography>
          </Box>
        </CardContent>
        <Divider />

        <label htmlFor="contained-button-file">
          <Button
            color="primary"
            fullWidth
            variant="text"
            component="span"
            onClick={handleClick}
          >
            Upload picture
          </Button>
        </label>
      </Card>
      <input
        accept="image/*"
        className={classes.input}
        id="contained-button-file"
        multiple
        type="file"
        onChange={(e) => fileSelectedHandler(e)}
        css={css`
          opacity: 0;
        `}
      />
    </div>
  );
};

AvatarUpload.propTypes = {
  className: PropTypes.string
};

export default AvatarUpload;