FROM python:3.11-slim

WORKDIR /app

# Install TeXLive for LaTeX compilation
RUN apt-get update && apt-get install -y --no-install-recommends \
    texlive-latex-base \
    texlive-latex-recommended \
    texlive-latex-extra \
    texlive-fonts-recommended \
    texlive-fonts-extra \
    texlive-xetex \
    latexmk \
    && rm -rf /var/lib/apt/lists/*

# Create storage directories
RUN mkdir -p /app/storage/cv/pdf /app/storage/cv/source /app/static/cv

COPY requirements.txt .
RUN pip install --no-cache-dir -r requirements.txt

COPY . .

EXPOSE 8000

CMD ["uvicorn", "app.main:app", "--host", "0.0.0.0", "--port", "8000", "--reload"]