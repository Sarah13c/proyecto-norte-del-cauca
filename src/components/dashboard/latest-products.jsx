import React from 'react';
import Box from '@mui/material/Box';
import Button from '@mui/material/Button';
import Card from '@mui/material/Card';
import CardActions from '@mui/material/CardActions';
import CardHeader from '@mui/material/CardHeader';
import Divider from '@mui/material/Divider';
import IconButton from '@mui/material/IconButton';
import List from '@mui/material/List';
import ListItem from '@mui/material/ListItem';
import ListItemAvatar from '@mui/material/ListItemAvatar';
import ListItemText from '@mui/material/ListItemText';
import Typography from '@mui/material/Typography'; 
import { ArrowRight as ArrowRightIcon } from '@phosphor-icons/react/dist/ssr/ArrowRight';
import { DotsThreeVertical as DotsThreeVerticalIcon } from '@phosphor-icons/react/dist/ssr/DotsThreeVertical';
import dayjs from 'dayjs';

export function LatestProducts({ products = [], sx }) {
  return (
    <Card sx={sx}>
      <CardHeader title={<Typography variant="h6" sx={{ fontFamily: 'Khula, sans-serif', fontWeight: 'bold' }}>Últimos Productos</Typography>} /> 
      <Divider />
      <List>
        {products.map((product, index) => (
          <ListItem divider={index < products.length - 1} key={product.id}>
            <ListItemAvatar>
              {product.image ? (
                <Box component="img" src={product.image} sx={{ borderRadius: 1, height: '48px', width: '48px' }} />
              ) : (
                <Box
                  sx={{
                    borderRadius: 1,
                    backgroundColor: 'var(--mui-palette-neutral-200)',
                    height: '48px',
                    width: '48px',
                  }}
                />
              )}
            </ListItemAvatar>
            <ListItemText
              primary={product.name}
              primaryTypographyProps={{ variant: 'subtitle1', sx: { fontFamily: 'Khula, sans-serif'} }} 
              secondary={`Updated ${dayjs(product.updatedAt).format('MMM D, YYYY')}`}
              secondaryTypographyProps={{ variant: 'body2', sx: { fontFamily: 'Khula, sans-serif' } }} 
            />
            <IconButton edge="end">
              <DotsThreeVerticalIcon weight="bold" />
            </IconButton>
          </ListItem>
        ))}
      </List>
      <Divider />
      <CardActions sx={{ justifyContent: 'flex-end' }}>
        <Button
          color="inherit"
          endIcon={<ArrowRightIcon fontSize="var(--icon-fontSize-md)" />}
          size="small"
          variant="text"
        >
          Ver Todos
        </Button>
      </CardActions>
    </Card>
  );
}

export default LatestProducts;
