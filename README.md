# Statyczna strona z moim CV
Strona została w pełni postawiona w S3 w chmurze AWS. Przedstawia ona krótki opis moich dotychczasowych osiągnięć.

## Architektura
Strona została napisana w html. Do użycia i postawienia strony **`www`** zostały przeze mnie użyte:
1. **`Amazon S3 bucket`**: Na nim znajdują się wymagane pliki do hostowania strony
2. **`Amazon CloudFront`**: Dzięki niemu pliki znajdujące sie w **`S3`** są hostowane jako strona **`www`**
