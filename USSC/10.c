#include <stdio.h>
#include <stdlib.h>

int func (int *a, int M, int *b, int N);

int func (int *a, int M, int *b, int N)
{
}

int main (void)
{
	int *a, *b, cur, prev1, prev2, M = 1, N = 1, max_M = 2, max_N = 2, result;

	FILE*ina = fopen("ina.txt", "r");
	FILE*inb = fopen("inb.txt", "r");
	FILE*out = fopen("output.txt", "w");

	if ( (ina == NULL) || (inb == NULL) )
	{
		printf("file error");
		fclose(out);
		return -1;
	}
	
	if ( (fscanf(ina, "%d", &prev1) <= 0) || (fscanf(inb, "%d", &prev2) <= 0) )
	{
		printf("file empty");
		fclose(ina);
		fclose(inb);
		fclose(out);
		return -1;
	}

	a = (int *) malloc (max_M * sizeof(int));
	a[0] = prev1;
	
	while (fscanf(ina, "%d", &cur) == 1)
	{
		M++;
		if (M > max_M)
		{
			max_M *= 2;
			a = (int *) realloc (a, max_M * sizeof(int));
		}
		a[M-1] = cur;
	}

	b = (int *) malloc (max_N * sizeof(int));
	b[0] = prev2;
	
	while (fscanf(inb, "%d", &cur) == 1)
	{
		N++;
		if (N > max_N)
		{
			max_N *= 2;
			b = (int *) realloc (b, max_N * sizeof(int));
		}
		b[N-1] = cur;
	}


	result = func(a, M, b, N);
	if (result == 0) 
	{
		printf("YES");
		fprintf(out, "YES");
	}
	else
	{
		printf("NO");
		fprintf(out, "NO");
	}

	free(a);
	free(b);
	fclose(ina);
	fclose(inb);
	fclose(out);
	return 0;

}