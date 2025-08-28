import { Card, CardContent, Typography, Button, Box, Rating, Zoom } from '@mui/material';
import Image from 'next/image';
import { Product } from '../services/productService';
import { Dispatch, SetStateAction } from 'react';

interface ProductCardProps {
  product: Product;
  hovered: number | null;
  setHovered: Dispatch<SetStateAction<number | null>>;
  onAddToCart: (product: Product) => void;
}

export default function ProductCard({ product, hovered, setHovered, onAddToCart }: ProductCardProps) {
  return (
    <Card
      onMouseEnter={() => setHovered(product.id)}
      onMouseLeave={() => setHovered(null)}
      sx={{
        position: 'relative',
        overflow: 'hidden',
        transition: 'transform 0.3s, box-shadow 0.3s',
        boxShadow: hovered === product.id ? 6 : 1,
        transform: hovered === product.id ? 'translateY(-4px)' : 'none',
        bgcolor: 'background.paper',
      }}
    >
      <Box sx={{ position: 'relative', aspectRatio: '4/3' }}>
        <Image src={product.thumbnail} alt={product.title} fill style={{ objectFit: 'cover' }} />
        <Box
          sx={{
            position: 'absolute',
            top: 8,
            left: 8,
            bgcolor: 'primary.main',
            color: 'primary.contrastText',
            px: 1,
            py: 0.5,
            borderRadius: 1,
            fontWeight: 'bold',
          }}
        >
          {`$${product.price}`}
        </Box>
      </Box>
      <CardContent>
        <Typography gutterBottom variant="h6" component="div">
          {product.title}
        </Typography>
        <Rating value={product.rating} precision={0.1} readOnly size="small" />
      </CardContent>
      <Zoom in={hovered === product.id} unmountOnExit>
        <Button
          size="small"
          variant="contained"
          color="primary"
          onClick={() => onAddToCart(product)}
          sx={{ position: 'absolute', bottom: 16, right: 16 }}
        >
          Adicionar ao carrinho
        </Button>
      </Zoom>
    </Card>
  );
}
